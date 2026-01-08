import { ApiResponse } from "./apiResponse";

export interface PaginatedResponse<T> extends ApiResponse<T> {
    take: number;
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    records: number;
}