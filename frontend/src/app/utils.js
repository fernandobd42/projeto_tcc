export const redirectTo = defaultPath => ({ history }) => path => history.push(path || defaultPath)
