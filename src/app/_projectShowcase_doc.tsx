"use client";


export default function ProjectShowcaseDoc({url}:{url:string}) {

  return (
    <div className="mt-4 min-h-screen flex items-center justify-center text-sm">
      <div className="w-full shadow-md rounded-lg">

        <div className="mt-4 lowercase">
          <h2 className="text-sm font-semibold mb-2">1. Create a `<code className="text-teal-500">project.gitfyi.json</code>` file</h2>
          <p className="">
            In each project you want to showcase, create a <code>project.gitfyi.json</code> file with the following structure:
          </p>
          <pre className="bg-neutral-950 text-white p-4 rounded mt-4 overflow-x-auto">
            {`[
  {
    "name": "Project Name",
    "img_link": "https://image-link.com",
    "live_link": "https://live-link.com",
    "code_link": "https://github.com/username/repo",
    "desc": "A brief description of the project.",
    "fork_link": "https://github.com/username/repo/fork",
    "sl_no": "1",
    "is_finished": true,
    "start_date": "2024-09-14"
  }
]`}
          </pre>
          <p className="mt-4 lowercase">
            Add this file in the root directory of every project you&apos;d like to showcase.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="mb-2 font-semibold lowercase">2. Fetch Projects with API Request</h2>
          <p className="lowercase">
            To get all the projects from GitHub, you can use the following API endpoint:
          </p>
          <pre className="bg-neutral-950 text-white p-4 rounded mt-4 overflow-x-auto">
            {url}
          </pre>
          <p className="mt-4 lowercase">
            Replace <code>username</code> and <code>token</code> with your GitHub username and API token if required.
          </p>
        </div>

        <div className="mt-4 lowercase">
          <h2 className="font-semibold mb-2">3. Example API Response</h2>
          <p className="">
            The API will return the projects in the following JSON format:
          </p>
          <pre className="bg-neutral-950 text-white p-4 rounded mt-4 overflow-x-auto">
            {`[
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
]`}
          </pre>
        </div>

        <div className="mt-4 lowercase">
          <h2 className="font-semibold mb-2">4. Display Projects in Your Portfolio</h2>
          <p className="">
            You can now use this JSON data to display your projects in your portfolio, using any desired layout and styling.
          </p>
          <p className=" mt-4">
            For instance, showcase each project with images, links, and descriptions, and style them using Tailwind or any other CSS framework.
          </p>
        </div>

  
      </div>
    </div>
  );
}
