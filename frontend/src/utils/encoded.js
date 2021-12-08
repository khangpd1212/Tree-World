export const encoded = {
  encodedAdmin (token) {
    const [encodedHeader, encodedBody, signature] = token
        .toString()
        .split(".");
  
      const { isAdmin, id } = encodedBody ? JSON.parse(window.atob(encodedBody)) : {};
    return { isAdmin: isAdmin, id: id}
  },
  encodedUser (token) {
    const [encodedHeader, encodedBody, signature] = token
      .toString()
      .split(".");

    const { isAdmin, id } = encodedBody ? JSON.parse(window.atob(encodedBody)) : {};
    return { isAdmin: isAdmin, id: id }
  },
}
