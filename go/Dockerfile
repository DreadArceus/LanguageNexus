FROM golang:1.20-alpine AS build
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -o api .

FROM alpine:3.14
RUN apk add --no-cache ca-certificates
WORKDIR /app

ENV GIN_MODE release

COPY --from=build /app/api ./

CMD ["./api"]
