import { Component } from "react";
import ErrorFallBack from "./ErrorFallBack";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallBack />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
