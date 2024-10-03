
const API_BASE_URL = 'http://localhost:8000';

export const getProjects = async() => {

  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    return response.json();
  } catch (error) {
    console.error('Error in getProjects:', error);
    throw error;
  }

}

export const getLocales = async() => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/locales`);
    return response.json();
  } catch (error) {
    console.error('Error in get locales:', error);
    throw error;
  }
}

export const getTokensByProject = async(projectId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in get tokens by project:', error);
    throw error;
  }

}

export const translateToken = async(projectId, tokenId, localeCode) => {

  try {
    const response = await fetch(`${API_BASE_URL}/api/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_id: projectId,
        token_id: tokenId,
        locale: localeCode
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error translating token:', error);
    throw error;
  }
}