import config from '../config';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT = 'GET_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getProjects = (filter = 'start_datetime', sort = 'desc', search = '') => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/by?filter=${filter}&sort=${sort}&search=${search}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log('response', json);
    if (response.ok) {
      dispatch({
        type: GET_PROJECTS,
        payload: json,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

// export const uploadFiles = (files, projectId) => async (dispatch) => {
//   try {
//     const formData = new FormData();
//     files.map((file) => {
//       formData.append('file', file);
//     });
//     formData.append('project_id', projectId);
//     const response = await fetch(`http://${config.server}:${config.port}/upload`, {
//       method: 'post',
//       headers: {
//         'Content-type': 'multipart/form-data; charset=UTF-8',
//         Authorization: localStorage.getItem('token'),
//       },
//       body: formData,
//     });
//     const json = await response.json();

//     if (!json.error) {
//       // dispatch({
//       //   type: FILES_UPLOAD,
//       //   payload: json.data,
//       // });
//       return json;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

export const createProject = (project) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const { files, ...projectInfo } = project;
    // console.log('files', files);
    // console.log('projectInfo', projectInfo);
    // console.log('JSON.stringify(projectInfo)', JSON.stringify(projectInfo));
    projectInfo.categories = projectInfo.categories.map((cat) => ({ category_id: cat }));
    const responseProject = await fetch(`http://${config.server}:${config.port}/projects/create`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(projectInfo),
    });
    // const newProject = await responseProject.json();

    // if (!NewProject.error) {
    //   const postedFiles = await uploadFiles(files, NewProject.project_id);


    //   if (!postedFiles.error) {
    //     dispatch({
    //       type: CREATE_PROJECT,
    //       payload: NewProject.data,
    //     });
    //     return;
    //   }
    // }
    if (!responseProject.error) {
      const member = {
        user_id: project.creator.user_id,
        role: 'Создатель',
      };
      const responseMember = await fetch(`http://${config.server}:${config.port}/projects/${project.project_id}/add_member`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(member),
      });
      // const newMember = await responseMember.json();

      // if (responseMember.ok) {
      //   dispatch({
      //     type: BECOME_MEMBER,
      //     payload: newMember,
      //   });
      //   return;
      // }
      // dispatch({
      //   type: CREATE_PROJECT,
      //   payload: newProject.data,
      // });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getProject = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/${id}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: GET_PROJECT,
        payload: json,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateProject = (project) => async (dispatch) => {
  try {
    console.log(project);
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const {
      project_reaction,
      comments,
      files,
      ...projectInfo
    } = project;
    // console.log('files', files);
    // console.log('projectInfo', projectInfo);
    // console.log('JSON.stringify(projectInfo)', JSON.stringify(projectInfo));
    projectInfo.categories = projectInfo.categories.map((cat) => ({ category_id: cat }));
    console.log(projectInfo);
    const response = await fetch(`http://${config.server}:${config.port}/projects/${projectInfo.project_id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(projectInfo),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: UPDATE_PROJECT,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/projects/${id}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (response.ok) {
      dispatch({
        type: DELETE_PROJECT,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const createReaction = (project_id, reaction, user_id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/reactions/create`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        project_id,
        reaction: +reaction,
        user_id,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: UPDATE_PROJECT,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteReaction = (project_id, user_id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/reactions/remove`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        project_id,
        user_id,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: UPDATE_PROJECT,
        payload: json,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateReaction = (project_id, reaction, user_id) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_LOADING',
      payload: '',
    });
    const response = await fetch(`http://${config.server}:${config.port}/reactions/update`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        project_id,
        reaction: +reaction,
        user_id,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: UPDATE_PROJECT,
        payload: json.data,
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
};
