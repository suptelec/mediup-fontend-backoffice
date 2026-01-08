export interface UserData {
  id: number;
  fullName: string;
  name: string;
  lastName: string;
  email: string;
  userName: string;
  status: number;
  type: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  profileImagePath: string | null;
  globalPermission: number;
}

export interface UserResponse {
  result: UserData;
  succeed: boolean;
  message: string | null;
  messageId: string | null;
  messageType: string | null;
}