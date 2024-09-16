const fetchUserRepos = async (username: string,token:string) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('API rate limit exceeded');
    }
    throw new Error('Failed to fetch repos');
  }

  const repos = await res.json();
  return repos;
};

const fetchConfigFile = async (username: string, repo: string, token:string) => {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/contents/project.gitfyi.json`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  if (res.status === 200) {
    const file = await res.json();
    const content = Buffer.from(file.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  }

  if (res.status === 403) {
    throw new Error('API rate limit exceeded');
  }

  return null;
};

const fetchFirstCommit = async (username: string, repo: string, token:string) => {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/commits?per_page=1`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('API rate limit exceeded');
    }
    throw new Error('Failed to fetch the first commit');
  }

  const commits = await res.json();
  return commits[0];
};

const fetchLastCommit = async (username: string, repo: string, token:string) => {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/commits?per_page=1&page=last`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('API rate limit exceeded');
    }
    throw new Error('Failed to fetch the last commit');
  }

  const commits = await res.json();
  return commits[0];
};

const fetchCommitDuration = async (username: string, repo: string, token:string) => {
  try {
    const firstCommit = await fetchFirstCommit(username, repo, token);
    const lastCommit = await fetchLastCommit(username, repo, token);

    if (firstCommit && lastCommit) {
      const firstDate = new Date(firstCommit.commit.committer.date).getTime();
      const lastDate = new Date(lastCommit.commit.committer.date).getTime();
      return lastDate - firstDate;
    }

    return null;
  } catch (error:any) {
    if (error?.message === 'API rate limit exceeded') {
      console.error('GitHub API rate limit exceeded');
    }
    console.error('Error fetching commits:', error);
    return null;
  }
};

export async function GET(
  req: Request,
  { params: { username, token } }: { params: { username: string , token:string},
}
) {
  if (!username || typeof username !== 'string') {
    return new Response('Invalid username', { status: 400 });
  }

  try {
    const repos = await fetchUserRepos(username, token);
    const projects = [];

    for (const repo of repos) {
      const configFile = await fetchConfigFile(username, repo.name, token);

      if (configFile) {
        projects.push({
          ...configFile,
          createdAt: repo.created_at,
          readme_link: `https://github.com/${username}/${repo.name}/blob/main/README.md`,
          duration: configFile.is_finished
            ? null
            : await fetchCommitDuration(username, repo.name,token),
        });
      }
    }

    return new Response(
        JSON.stringify(projects), 
        {
        headers: { 'Content-Type': 'application/json'},
        status: 200
      },
);
  } catch (error:any) {
    console.error(error);
    if (error?.message === 'API rate limit exceeded') {
      return new Response('GitHub API rate limit exceeded', { status: 429 });
    }
    return new Response('Failed to fetch projects', { status: 500 });
  }
}
