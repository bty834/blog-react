
# Introduction
A simple profile website with personal blog publishing and public file uploading

[Frontend](https://github.com/bty834/profile-nextjs): React(Next)+Axios+Tailwindcss

[Backend](https://github.com/bty834/profile-spring-boot): Spring Boot + MySQL + Redis (todo : + OSS + ElasticSearch+Logstash)


# Function
- Resume with timeline intro
- CRUD blog with markdown
- Record all type of files , backend using Ali OSS or IPFS or local Server Storage
- Switch light / dark mode
- Inner-website search(todo)


please add a `.env` file，and set following constants
(must start with `NEXT_PUBLIC_` in Next.js):
- `NEXT_PUBLIC_BASE_API` for Axios to fetch data
