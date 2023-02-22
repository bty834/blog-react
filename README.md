demonstration can be found in [https://www.btyhub.site](https://www.btyhub.site) or [https://175.178.27.36/](https://175.178.27.36/)
# Introduction
A simple profile website with personal blog publishing and public file uploading

[Frontend](https://github.com/bty834/profile-nextjs): React(Next)+Axios+Tailwindcss

[Backend](https://github.com/bty834/profile-spring-boot): Spring Boot + MySQL + Redis + S3 Object Storage


# Function
- Resume with timeline intro
- CRUD blog with markdown
- Record all types of files, backend using S3 Object Storage or local Server Storage (current implementation is [filebase](https://filebase.com/))
- Switch light/dark mode
- Inner-website search(todo)



Note: please add a `.env` file， and set the following constants (must start with `NEXT_PUBLIC_` in Next.js):
- `NEXT_PUBLIC_BASE_API` for Axios to fetch data
- `NEXT_PUBLIC_EMAIL` your email address
- `NEXT_PUBLIC_GITHUB` your GitHub address

Another Note: Filebase service is unavailable in mainland China, I'm looking for another available service...