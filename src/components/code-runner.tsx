import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/code-runner.css";

export interface CodeRunnerProps {
	title: string;
	code: string;
	onRun: () => Promise<string>;
}

export function CodeRunner({ title, code, onRun }: CodeRunnerProps) {
	const [isRunning, setIsRunning] = useState(false);
	const [output, setOutput] = useState<string | null>(null);

	async function handleRun() {
		setIsRunning(true);
		try {
			const result = await onRun();
			setOutput(result);
		} catch {
			setOutput(null);
		} finally {
			setIsRunning(false);
		}
	}

	return (
		<div className="code-runner">
			<h2 className="code-runner-title">{title}</h2>
			<div className="code-runner-body">
				<div className="code-runner-code">
					<SyntaxHighlighter language="ts" style={oneDark} wrapLongLines>
						{code}
					</SyntaxHighlighter>
					<button
						className="code-runner-button"
						onClick={handleRun}
						disabled={isRunning}
						type="button"
					>
						{isRunning ? "Running..." : "Run Code"}
					</button>
				</div>
				<div className="code-runner-code">
					{output && (
						<SyntaxHighlighter language="json" style={oneDark} wrapLongLines>
							{output}
						</SyntaxHighlighter>
					)}
				</div>
			</div>
		</div>
	);
}
