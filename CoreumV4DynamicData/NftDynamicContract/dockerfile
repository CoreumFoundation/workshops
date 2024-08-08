# Use the official Rust image as a base
FROM rust:latest

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
  libssl-dev pkg-config build-essential

# Install the wasm32-unknown-unknown target
RUN rustup target add wasm32-unknown-unknown

# Set the working directory
WORKDIR /code

# Copy the current directory contents into the container
COPY . .

# Build the project
RUN cargo build --release --lib --target wasm32-unknown-unknown

# The cosmwasm optimizer will be run outside this Dockerfile
