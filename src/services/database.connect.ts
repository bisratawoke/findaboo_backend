import { PrismaClient } from "@prisma/client";

const databaseConnection = new PrismaClient();
export default databaseConnection;
