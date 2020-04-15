import {
  GET_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT,
  CREATE_REACTION_LOCAL,
  UPDATE_REACTION_LOCAL,
  DELETE_REACTION_LOCAL,
  CREATE_PROJECT_REACTION,
  DELETE_PROJECT_REACTION,
  UPDATE_PROJECT_REACTION,
} from '../actions/projects';
import {
  CREATE_PROJECT_COMMENT,
} from '../actions/comments';

export const projects = (state = [], action) => {
  switch (action.type) {
    case GET_PROJECTS: {
      return action.payload;
    }
    case CREATE_REACTION_LOCAL: {
      return state.map((project) => (project.project_id === action.payload.project_id
        ? {
          ...project,
          project_reaction: [
            ...project.project_reaction,
            {
              user_id: action.payload.user_id,
              project_id: action.payload.project_id,
              reaction: action.payload.reaction,
            },
          ],
          likes: action.payload.reaction ? project.likes + 1 : project.likes,
          dislikes: !action.payload.reaction ? project.dislikes + 1 : project.dislikes,
        } : project));
    }
    case UPDATE_REACTION_LOCAL: {
      return state.map((project) => (project.project_id === action.payload.project_id
        ? {
          ...project,
          project_reaction: [
            ...project.project_reaction.filter((item) => item.user_id !== action.payload.user_id),
            {
              user_id: action.payload.user_id,
              project_id: action.payload.project_id,
              reaction: action.payload.reaction,
            },
          ],
          likes: action.payload.reaction ? project.likes + 1 : project.likes - 1,
          dislikes: !action.payload.reaction ? project.dislikes + 1 : project.dislikes - 1,
        } : project));
    }
    case DELETE_REACTION_LOCAL: {
      return state.map((project) => (project.project_id === action.payload.project_id
        ? {
          ...project,
          project_reaction: project.project_reaction
            .filter((reaction) => reaction.user_id !== action.payload.user_id),
          likes: action.payload.reaction ? project.likes - 1 : project.likes,
          dislikes: !action.payload.reaction ? project.dislikes + 1 : project.dislikes,
        } : project));
    }
    default: {
      return state;
    }
  }
};

export const project = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECT: {
      return action.payload;
    }
    case CREATE_PROJECT: {
      return action.payload;
    }
    case UPDATE_PROJECT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_PROJECT: {
      return {};
    }
    case CREATE_PROJECT_REACTION: {
      return {
        ...state,
        project_reaction: [
          ...state.project_reaction,
          {
            user_id: action.payload.user_id,
            project_id: action.payload.project_id,
            reaction: action.payload.reaction,
          },
        ],
        likes: action.payload.reaction ? state.likes + 1 : state.likes,
        dislikes: !action.payload.reaction ? state.dislikes + 1 : state.dislikes,
      };
    }
    case UPDATE_PROJECT_REACTION: {
      return {
        ...state,
        project_reaction: [
          ...state.project_reaction.filter((item) => item.user_id !== action.payload.user_id),
          {
            user_id: action.payload.user_id,
            project_id: action.payload.project_id,
            reaction: action.payload.reaction,
          },
        ],
        likes: action.payload.reaction ? state.likes + 1 : state.likes - 1,
        dislikes: !action.payload.reaction ? state.dislikes + 1 : state.dislikes - 1,
      };
    }
    case DELETE_PROJECT_REACTION: {
      return {
        ...state,
        project_reaction: state.project_reaction
          .filter((reaction) => reaction.user_id !== action.payload.user_id),
        likes: action.payload.reaction ? state.likes - 1 : state.likes,
        dislikes: !action.payload.reaction ? state.dislikes + 1 : state.dislikes,

      };
    }
    case CREATE_PROJECT_COMMENT: {
      return {
        ...state,
        comments: [
          ...state.comments,
          {
            project_id: action.payload.project_id,
            content: action.payload.content,
            created_datetime: action.payload.created_datetime,
            user: action.payload.user,
          },
        ],
      };
    }
    default: {
      return state;
    }
  }
};
