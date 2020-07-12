const BOARD_SCHEME = {
  id: undefined,
  title: undefined,
}
const TASK_SCHEME = {
  id: undefined,
  boardId: undefined,
  title: undefined,
  completed: false,
  completedAt: null
}

export const state = () => ({
  boardSequence: 0, // ボードID採番用シーケンス
  taskSequence: 0, // タスクID採番用シーケンス
  boards: [],
  tasks: [],
})

export const getters = {
  findBoard: (state) => (boardId) => {
    return state.boards.find(board => board.id === boardId)
  },
  findTask: (state) => (taskId) => {
    return state.tasks.find(task => task.id === taskId)
  },
  findBoardByTitle: (state) => (boardTitle) => {
    return state.boards.find(board => board.title === boardTitle)
  },
  getTasksByBoardId: (state) => (boardId) => {
    return state.tasks.filter(task => task.boardId === boardId)

  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
    console.warn('nuxtServerInit')
    commit('CLEAR_BOARDS')
    await dispatch('addBoard', 'default')
  },
  incrementBoardSequence({state, commit}) {
    const boardId = state.boardSequence + 1;
    commit("SET_BOARD_SEQUENCE", boardId)
    return boardId;
  },
  incrementTaskSequence({state, commit}) {
    const taskId = state.taskSequence + 1;
    commit("SET_TASK_SEQUENCE", taskId)
    return taskId;
  },
  async addBoard({commit, dispatch}, title) {
    const boardId = await dispatch('incrementBoardSequence')
    const boardObj = {...BOARD_SCHEME, ...{id: boardId, title: title}}
    commit("ADD_BOARD", boardObj)
  },
  async addTask({commit, dispatch}, {boardId, title, completed}) {
    const taskId = await dispatch('incrementTaskSequence')
    const taskObj = {...TASK_SCHEME, ...{id: taskId, boardId, title, completed}}
    commit("ADD_TASK", taskObj)
  },
  removeTask({commit, getters}, taskId) {
    const taskObj = getters.findTask(taskId)
    commit("REMOVE_TASK", taskObj)
  },
  toggleComplete({commit, getters}, taskId) {
    const taskObj = getters.findTask(taskId)
    commit("TOGGLE_TASK", taskObj)
  }
}

export const mutations = {
  SET_BOARD_SEQUENCE(state, boardSequence) {
    state.boardSequence = boardSequence
  },
  SET_TASK_SEQUENCE(state, taskSequence) {
    state.taskSequence = taskSequence
  },
  CLEAR_BOARDS(state) {
    state.boards = []
  },
  ADD_BOARD(state, boardObj) {
    state.boards.push(boardObj)
    console.warn(state.boards)
  },
  ADD_TASK(state, taskObj) {
    taskObj.completedAt = taskObj.completed ? new Date() : null
    state.tasks.push(taskObj)
  },
  REMOVE_TASK(state, taskObj) {
    const copyTasks = [...state.tasks]
    const objIndex = copyTasks.findIndex(task => task.id === taskObj.id)
    copyTasks.splice(objIndex, 1)
    state.tasks = copyTasks
  },
  TOGGLE_TASK(state, taskObj) {
    taskObj.completed = !taskObj.completed
    taskObj.completedAt = taskObj.completed ? new Date() : null
  }
}