export interface AllDBEntriesResponse{
    emailAddress: DBStringEntry,
    id: DBStringEntry,
    addressLabel: DBStringEntry
}

interface DBStringEntry {
    S: string
}