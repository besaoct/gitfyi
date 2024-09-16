"use client"; // Client-side component

import { base_url } from "@/routes";
import { useState } from "react";
import ProjectShowcaseDoc from "./_projectShowcase_doc";

// Define the Project interface with all fields
interface Project {
  name: string;
  img_link?: string;
  live_link: string;
  code_link: string;
  desc: string;
  fork_link?: string;
  sl_no: number | string;
  is_finished: boolean | string;
  start_date: string;
  createdAt: string;
  readme_link: string;
  duration: number | null | string;
}

export default function Homepage() {
  // State for the input value and the API result
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch data from your API with the provided username
      const response = await fetch(`/api/projects/with-token/${username}/${token}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for username: ${username}`);
      }
      const data = await response.json();
      setResult(data); // Set the result from the API response
      setSuccess(response.status===200)
      console.log(data)
    } catch (error:any) {
      setError(error.message);
    } finally {
      setLoading(false); // Always reset the loading state
    }
  };

  const fetchState = (str:string,show?:string) => (loading && 'loading...') || 
  (error && `error fetching ${str}...!`) || (success && result.length<1 && !show) && `ensure that ${str} has been added to the project.gitfyi.json file of your projects`  ||  (str)

  const exampleProject: Project = {
    name:  fetchState('name'),
    img_link: fetchState("img link"),
    live_link:fetchState("live link"),
    code_link:fetchState("github repo link"),
    desc:fetchState("A brief description of the project."),
    fork_link: fetchState("fork link"),
    sl_no: fetchState('sl no'),
    is_finished: fetchState('is_finished field (true/false)'),
    start_date: fetchState("project start date"),
    createdAt: fetchState("project created at date", "hide"),
    readme_link:fetchState("project readme file link", "hide"),
    duration: fetchState('project duration', "hide")
  };

  return (
<>
<div className="border-b pb-4 border-neutral-500/20 p-4  md:max-w-3xl mx-auto sm:text-center container w-full">
 <h1 className="text-5xl mb-4 font-extrabold text-teal-600">gitfyi.</h1>
 <p className="text-neutral-400">free API to organize and showcase your GitHub profile & project repos effortlessly.</p>
<div className="mt-2 flex flex-wrap gap-2 w-full justify-start sm:justify-center items-center lowercase font-mono">
<a 
    href="https://github.com/besaoct/gitfyi" 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-neutral-700 rounded px-2 hover:bg-neutral-600 text-white"
  >
    Code
  </a>
  
  <a 
    href="https://github.com/besaoct/gitfyi/fork" 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-neutral-700 rounded px-2 hover:bg-neutral-600 text-white"
  >
    Fork
  </a>
  
  <a 
    href="https://github.com/besaoct/gitfyi/stargazers" 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-neutral-700 rounded px-2 hover:bg-neutral-600 text-white"
  >
    Star
  </a>
  <a 
    href="https://github.com/besaoct/gitfyi/pulls" 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-neutral-700 rounded px-2 hover:bg-neutral-600 text-white"
  >
    Contribute
  </a>
</div>
 </div>
    <div className="container mx-auto p-4 max-w-screen-xl min-h-screen flex flex-col items-start justify-center">

      
   <div className="flex flex-row items-start justify-center w-full flex-wrap md:flex-nowrap gap-4">
   <div className="flex-1 md:sticky  top-0 pt-4 min-w-64">
        {/* Show an error message if something goes wrong */}
        {error && <p className="text-red-500 my-4">{error}</p>}
            {/* Form to capture the username */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update state when input changes
          placeholder="enter GitHub username"
          className="border border-neutral-700 p-2 rounded text-white bg-neutral-950 w-full mb-4"
        />
         
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)} // Update state when input changes
          placeholder="enter GitHub Token"
          className="border border-neutral-700 p-2 rounded text-white bg-neutral-950 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-teal-700 text-orange p-2 rounded w-fit mr-auto"
        >
         {loading ?'loading...': 'fetch data'}
        </button>
      </form>

     
       {/* Prerequisites Section */}
       <div className="mt-4 lowercase">
          <h2 className="text-xl font-semibold mb-2 text-teal-600 ">prerequisites</h2>
          <p className="text-neutral-200">before you can showcase anything, you need the following:</p>
          
          <ol className="list-decimal list-inside mt-4 text-neutral-200">
            <li><strong>GitHub Account Username</strong>: This is your GitHub username.</li>
            <li><strong>GitHub Token</strong>:
              <ul className="list-disc list-inside ml-4">
                <li>Go to your GitHub <a href="https://github.com/settings/tokens" target="_blank" className="text-blue-600 underline">Personal Access Tokens</a> page.</li>
                <li>Click <strong>Generate new token</strong>.</li>
                <li>Select scopes such as <strong>repo</strong> if you want to access private repositories (public scopes can be used for public repositories).</li>
                <li>Copy the token and store it securely. This token is required for API requests.</li>
              </ul>
            </li>
          </ol>
        </div>
  
      </div>


      <div className="flex flex-col items-center justify-center h-auto overflow-y-auto md:max-w-[50%] w-full">
       <h1 className="text-xl font-bold w-full text-left text-teal-600">projects</h1>
      <h2 className="py-4 font-bold w-full text-left">projects api url (with github token)</h2>
    
       <pre className="whitespace-nowrap bg-neutral-950 text-white p-4 rounded overflow-x-auto w-full">
       {`${base_url}/api/projects/with-token/${username?username:'[username]'}/${token?token:'[token]'}`}
       </pre>
  

      <p className="mt-4 w-full text-left font-bold">response</p>
      {result.length > 0 ? (
        <div className="mt-4 w-full bg-neutral-950 border-neutral-700 text-white p-4 rounded overflow-auto">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="mt-4 w-full bg-neutral-950 border-neutral-700 text-white p-4 rounded overflow-auto h-96">
        
          <pre className="whitespace-pre-wrap">
           {JSON.stringify([exampleProject], null, 2)}
          </pre>
        </div>
      )}


      <div className="mt-4 w-full text-left">
        <h2 className="font-bold">steps to showcase your github projects in your portfolio.</h2>
        <ProjectShowcaseDoc url={`${base_url}/api/projects/with-token/${username?username:'[username]'}/${token?token:'[token]'}`}/>
        </div>
      </div>
   </div>
    </div>
</>
  );
}
