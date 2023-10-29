import { map } from 'lodash';

interface NewLineTextProps {
  className?: string;
  text: string;
}

const NewLineText = ({ text, className }: NewLineTextProps): JSX.Element => {
  const splitText = text.split('\n');
  return (
    <div className={className}>
      {map(splitText, (line, index) => {
        return (
          <span key={line}>
            {line}
            {index !== splitText.length - 1 && <br />}
          </span>
        );
      })}
    </div>
  );
};

export default NewLineText;
