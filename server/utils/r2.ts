import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

let r2Client: S3Client | null = null;

/**
 * Get or initialize the R2 client
 */
export function getR2Client() {
  if (r2Client) {
    return r2Client;
  }

  const config = useRuntimeConfig();

  // Check if R2 is configured
  if (!config.r2Endpoint || !config.r2AccessKeyId || !config.r2SecretAccessKey) {
    console.warn("R2 credentials not configured. R2 operations will fail.");
    return null;
  }

  r2Client = new S3Client({
    region: "auto",
    endpoint: config.r2Endpoint,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey,
    },
  });

  return r2Client;
}

/**
 * Upload a file to R2
 */
export async function uploadToR2(
  file: Buffer | Uint8Array,
  key: string,
  contentType: string
) {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 client not configured");
  }

  const config = useRuntimeConfig();
  const command = new PutObjectCommand({
    Bucket: config.r2BucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await client.send(command);

  return {
    key,
    url: `${config.public.r2BaseUrl}/${key}`,
  };
}

/**
 * Get a file from R2
 */
export async function getFromR2(key: string) {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 client not configured");
  }

  const config = useRuntimeConfig();
  const command = new GetObjectCommand({
    Bucket: config.r2BucketName,
    Key: key,
  });

  const response = await client.send(command);
  return response;
}

/**
 * List files in R2 bucket
 */
export async function listR2Files(prefix?: string) {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 client not configured");
  }

  const config = useRuntimeConfig();
  const command = new ListObjectsV2Command({
    Bucket: config.r2BucketName,
    Prefix: prefix,
  });

  const response = await client.send(command);
  return response.Contents || [];
}

/**
 * Delete a file from R2
 */
export async function deleteFromR2(key: string) {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 client not configured");
  }

  const config = useRuntimeConfig();
  const command = new DeleteObjectCommand({
    Bucket: config.r2BucketName,
    Key: key,
  });

  await client.send(command);
}

/**
 * Generate a presigned URL for private R2 objects
 */
export async function getPresignedUrl(key: string, expiresIn: number = 3600) {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 client not configured");
  }

  const config = useRuntimeConfig();
  const command = new GetObjectCommand({
    Bucket: config.r2BucketName,
    Key: key,
  });

  return await getSignedUrl(client, command, { expiresIn });
}