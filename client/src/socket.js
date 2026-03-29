// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import { io } from "socket.io-client";

const socket = io("https://srishty-social-backend.onrender.com");

export default socket;