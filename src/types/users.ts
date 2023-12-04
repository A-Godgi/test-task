export interface GetUsersResponse {
    success: boolean
    page: number
    total_pages: number
    total_users: number
    count: number
    links: Links
    users: User[]
}

export interface GetUsersRequest {
    count?: number
    offset?: number
    page?: number
}

export interface GetUserByIdResponse {
    success: boolean
    user: User
}

interface Links {
    next_url: null | string
    prev_url: null | string
}

export interface User {
    id: string
    name: string
    email: string
    phone: string
    position: string
    position_id: string
    registration_timestamp: number
    photo: string
}

export interface AddUserRequest {
    name: string
    email: string
    phone: string
    position_id: number
    photo: File
}

export interface AddUserResponse {
    success: boolean
    user_id: number
    message: string
}

