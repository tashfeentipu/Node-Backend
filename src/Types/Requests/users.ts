export interface LoginRequest {
    email: string
    password: string
}

export interface WalletLoginRequest {
    txHash: string
    publicKey: string
}

export interface SignUpRequest {
    email?: string
    password?: string
    contact?: string
    publicKey?: string
    nonce?: string
}