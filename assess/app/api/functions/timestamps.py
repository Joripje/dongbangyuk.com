from datetime import datetime


def time_normalization(timestamps: list):
    ref_time = timestamps[0][0]
    normalized_timestamps = []
    for timestamp in timestamps:
        normalized = [(timestamp[0] - ref_time).total_seconds(), (timestamp[1] - ref_time).total_seconds()]
        normalized_timestamps.append(normalized)
    return normalized_timestamps