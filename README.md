# gitfyi

**gitfyi** is a free API that helps you organize and effortlessly showcase your GitHub profile and project repos. With it, you can easily retrieve and display your profile & all project repos in JSON format, making it simple to integrate into your portfolio website.

## Features

- Fetch GitHub data through a free API.
- Display profile, project repos with details like name, image, live demo link, code repository, and more.
- Easily integrate with your portfolio using the returned JSON data.

## Prerequisites

Before using gitfyi, you need:

1. **GitHub Account Username** – Your GitHub username.
2. **GitHub Token**:
   - Go to your [GitHub Personal Access Tokens](https://github.com/settings/tokens) page.
   - Click **Generate new token**.
   - Select necessary scopes (like `repo` for private repositories or just `public_repo` for public ones).
   - Copy the token and store it securely.

## How to Use projects repos API

### 1. Create a `project.gitfyi.json` File

In each repository you want to showcase, add a `project.gitfyi.json` file with the following structure:

```json
[
  {
    "name": "Project Name",
    "img_link": "https://image-link.com",
    "live_link": "https://live-site-link.com",
    "code_link": "https://github.com/username/repo",
    "desc": "A brief description of the project.",
    "fork_link": "https://github.com/username/repo/fork",
    "sl_no": "1",
    "is_finished": true,
    "start_date": "2024-09-14"
  }
]
```

### 2. Fetch Projects Using API

To get your projects, make a request to the following API:

```bash
https://gitfyi.vercel.app/api/projects/with-token/[your-username]/[your-github-token]
```

Replace `[your-username]` and `[your-github-token]` with your GitHub username and token, respectively.

### 3. Example API Response

The API will return a JSON array like this:

```json
[
  {
    "name": "Project Name",
    "img_link": "https://image-link.com",
    "live_link": "https://live-site-link.com",
    "code_link": "https://github.com/username/repo",
    "desc": "A brief description of the project.",
    "fork_link": "https://github.com/username/repo/fork",
    "sl_no": 1,
    "is_finished": true,
    "start_date": "2024-09-14",
    "createdAt": "2024-08-10T19:10:30Z",
    "readme_link": "https://github.com/username/repo/blob/main/README.md",
    "duration": null
  }
]
```

### 4. Display Projects in Your Portfolio

You can now use this JSON data to display your GitHub projects in your portfolio website with any layout and styling you prefer.

## Links

- **Main Repo**: [gitfyi](https://github.com/besaoct/gitfyi)
- **Contribute**: [Contribute to gitfyi](https://github.com/besaoct/gitfyi/pulls)
  