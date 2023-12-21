import HttpException, {
  HttpErrorCode,
  HandleError,
} from "../Exceptions/http.exception";
import databaseConnection from "./database.connect";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function create(payload: {
  phoneNumber: string;
  password: string;
}) {
  try {
    const response = await databaseConnection.user_account.create({
      data: payload,
    });
    return response;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        let uniqueContraintsException = new HttpException(
          "Record already exists in database",
          HttpErrorCode.BAD_REQUEST
        );
        HandleError(uniqueContraintsException);
      }
    }
    HandleError(error);
  }
}

export async function find(payload: { phoneNumber: string; password: string }) {
  try {
    const response = await databaseConnection.user_account.findUnique({
      where: {
        phoneNumber: payload.phoneNumber,
      },
      select: {
        id: true,
        phoneNumber: true,
        password: true,
      },
    });
    if (!response) {
      throw new HttpException("Not Found", HttpErrorCode.NOT_FOUND);
    } else {
      verifyPassword(response.password, payload.password);
      return { id: response.id, phoneNumber: response.phoneNumber };
    }
  } catch (error) {
    HandleError(error);
  }
}

function verifyPassword(
  databaseRecordPassword: string,
  requestPassword: string
) {
  if (databaseRecordPassword != requestPassword)
    throw new HttpException("Unauthenticated", HttpErrorCode.UNAUTHENTICATED);
}
