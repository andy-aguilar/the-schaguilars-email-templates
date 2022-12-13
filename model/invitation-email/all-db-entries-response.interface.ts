export interface AllDBEntriesResponse{
    emailAddress: DBStringEntry,
    id: DBStringEntry,
    addressLabel: DBStringEntry,
    hasRsvped: DBBooleanEntry
}

interface DBStringEntry {
    S: string
}

interface DBBooleanEntry{
    BOOL: boolean
}