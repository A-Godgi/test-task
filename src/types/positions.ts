export interface PositionsResponse{
    success: boolean
    positions: Position[]
}

interface Position {
    id: number
    name: string
}