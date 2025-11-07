import { v4 as uuidv4 } from "uuid";
import Docker from "dockerode";
import { PutCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import ddb from "../models/dynamoClient.js";

const docker = new Docker(); // local Docker socket
const SESSIONS_TABLE = process.env.DYNAMO_TABLE_SESSIONS;

/**
 * GET /api/labs
 * Returns available lab templates
 */
export const listLabs = async (req, res) => {
  try {
    const labs = [
      { id: "lab1", name: "Node.js Basics", description: "Learn Node.js fundamentals" },
      { id: "lab2", name: "Python Fundamentals", description: "Practice Python basics" },
      { id: "lab3", name: "React Beginner Lab", description: "Build a simple React app" },
    ];
    res.json({ labs });
  } catch (err) {
    console.error("List Labs Error:", err);
    res.status(500).json({ message: "Failed to fetch labs" });
  }
};

/**
 * POST /api/labs/sessions
 * Creates and starts a Docker lab container
 */
export const createSession = async (req, res) => {
  try {
    const { labId } = req.body;
    if (!labId) return res.status(400).json({ message: "labId is required" });

    const sessionId = uuidv4();

    const container = await docker.createContainer({
      Image: "vlaas-lab-base", // make sure this image is built locally
      name: `lab-${sessionId}`,
      Tty: true,
      ExposedPorts: { "8080/tcp": {} },
      HostConfig: {
        PortBindings: { "8080/tcp": [{ HostPort: "" }] }, // auto assign
        AutoRemove: true,
      },
    });

    await container.start();

    const info = await container.inspect();
    const hostPort = info.NetworkSettings.Ports["8080/tcp"][0].HostPort;

    const sessionItem = {
      sessionId,
      userId: req.user.id,
      labId,
      containerId: container.id,
      hostPort,
      status: "running",
      createdAt: new Date().toISOString(),
    };

    await ddb.send(
      new PutCommand({
        TableName: SESSIONS_TABLE,
        Item: sessionItem,
      })
    );

    res.status(201).json({
      message: "Lab session started successfully",
      session: {
        id: sessionId,
        labId,
        port: hostPort,
        url: `http://localhost:${hostPort}`,
      },
    });
  } catch (err) {
    console.error("Create Session Error:", err);
    res.status(500).json({ message: "Failed to start lab session" });
  }
};

/**
 * GET /api/labs/sessions
 * Returns all lab sessions (for current user)
 */
export const listSessions = async (req, res) => {
  try {
    const result = await ddb.send(
      new ScanCommand({
        TableName: SESSIONS_TABLE,
      })
    );
    res.json({ sessions: result.Items || [] });
  } catch (err) {
    console.error("List Sessions Error:", err);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

/**
 * DELETE /api/labs/sessions/:id
 * Stops and removes a Docker lab container
 */
export const stopSession = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Session ID required" });

    const container = docker.getContainer(id);
    await container.stop();

    await ddb.send(
      new DeleteCommand({
        TableName: SESSIONS_TABLE,
        Key: { sessionId: id },
      })
    );

    res.json({ message: "Lab session stopped successfully" });
  } catch (err) {
    console.error("Stop Session Error:", err);
    res.status(500).json({ message: "Failed to stop lab session" });
  }
};
