from datetime import datetime


def time_normalization(timestamps: list):
    ref_time = timestamps[0][0]

    for i, timestamp in enumerate(timestamps):
        start, end = timestamp
        start = round((start - ref_time).total_seconds())
        end = round((end - ref_time).total_seconds())
        timestamps[i] = [start, end]
    
    return timestamps