import React, {Component} from "react";
import { AuthProvider } from "./providers/authProvider";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/routes";
import { ThemeProvider } from 'styled-components';
import themeProvider from './providers/themeProvider';

export default class App extends Component {
  render() {
    return (
        <AuthProvider>
            <ThemeProvider theme={ themeProvider }>
                <BrowserRouter children={ Routes } basename={ "/" } />
            </ThemeProvider>
        </AuthProvider>
    );
  }
}