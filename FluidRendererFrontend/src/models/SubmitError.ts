import { attempt } from "../utils/attempt";

export class SubmitError extends Error {
  override name = "SubmitError";
  details?: string;

  constructor(
    public status: number,
    message: string,
    { details, ...options }: ErrorOptions & { details?: string }
  ) {
    super(message, options);
    this.details = details;
  }

  static async fromResponse(respose: Response): Promise<SubmitError> {
    const [data, error] = await attempt(() => respose.json());
    if (error != null || !isErrorResponse(data)) {
      return new SubmitError(respose.status, "Unexpected error", {
        details: respose.statusText,
      });
    }
    const err = new SubmitError(respose.status, data.error, {
      details: data.details,
    });
    return err;
  }
}

function isErrorResponse(
  data: unknown
): data is { error: string; details?: string } {
  if (!data || typeof data !== "object") return false;
  if (!("error" in data) || typeof data.error !== "string") return false;
  if ("details" in data && typeof data.details !== "string") return false;
  return true;
}
