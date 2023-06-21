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

RUN addgroup --system --gid 1004 golang
RUN adduser --system --uid 1004 gin
USER gin

CMD ["./api"]
