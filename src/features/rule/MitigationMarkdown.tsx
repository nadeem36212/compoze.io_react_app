
import ReactMarkdown from 'react-markdown';


interface ImpactStatusProps {
  mitigation: string
}

export const MitigationMarkdown = ({ mitigation }: ImpactStatusProps): JSX.Element => {
  const yamlMarkDown = `
  ~~~yaml
  ${mitigation}
  `
  return (
    <ReactMarkdown>
      {yamlMarkDown}
    </ReactMarkdown>
  );
};
