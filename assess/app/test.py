from kafka import KafkaConsumer, KafkaProducer
import threading


bootstrap_server_address = ['70.12.246.183:9092']
producer_config = {
    'bootstrap_servers': bootstrap_server_address
}

consumer_config = {
    'bootstrap_servers': bootstrap_server_address,
    'auto_offset_reset': 'earliest',
    'enable_auto_commit': True,
    'group_id': 'my-group',
    'value_deserializer': lambda m: m.decode('utf-8'),
    # 'consumer_timeout_ms': 1000
}



# Define a function to process messages
def process_message(message: str):
    producer = KafkaProducer(**producer_config)
    # Process message here
    result = message.upper()

    # Send the result to the output topic
    producer.send('test', result.encode('utf-8'))
    producer.flush()
    return

# Continuously consume messages from the input topic
print("CONSUMER")
while True:
    print('running')
    consumer = KafkaConsumer('input-topic', **consumer_config)
    messages = consumer.poll(timeout_ms=1000)
    print(messages)
    if messages:
        for message in consumer:
            print(message)
            process_message(message)


# def consume():
#     consumer = KafkaConsumer('input-topic', **consumer_config)
#     print(consumer.bootstrap_connected())
#     for message in consumer:
#         print(message)



# t = threading.Thread(target=consume)
# t.start()