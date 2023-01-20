export enum ListenerStatus {
    WaitingForCallback = 1,
    Callback = 2,
    Finished = 3,
    Error = 4
}

export enum ListenerType {
    GetUser = 100,
    GetUsers = 101
}