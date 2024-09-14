import { NextApiRequest, NextApiResponse } from 'next';

// Function to fetch repos for a given GitHub username
const fetchUserRepos = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();
  return repos;
};

// Function to check for gitfyi.json in repo
const fetchConfigFile = async (username: string, repo: string) => {
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/gitfyi.json`);
  if (res.status === 200) {
    const file = await res.json();
    const content = Buffer.from(file.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  }
  return null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const repos = await fetchUserRepos(username as string);
    const projects = [];

    for (const repo of repos) {
      // Check if config file exists in the repo
      const configFile = await fetchConfigFile(username as string, repo.name);

      if (configFile) {
        const firstCommit = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`);
        const lastCommit = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1&page=1`);
        const duration = configFile.is_finished
          ? null
          : new Date(lastCommit[0].commit.committer.date).getTime() - new Date(firstCommit[0].commit.committer.date).getTime();

        projects.push({
          ...configFile,
          createdAt: repo.created_at,
          readme_link: `https://github.com/${username}/${repo.name}/blob/main/README.md`,
          duration: configFile.is_finished ? null : duration,
        });
      }
    }

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
