import * as React from 'react';
import { Table } from 'react-bootstrap';
import { InputData } from './input-interface';
import { defaultColors } from '../../constants/colors';

const getTopEmojis = (
  inputData: Record<string, number>,
  amount: number
): { name: string; amount: number }[] => {
  const sorted = Object.keys(inputData).sort(
    (a, b) => inputData[b] - inputData[a]
  );

  return new Array(amount)
    .fill(0)
    .map((_, i) => ({ name: sorted[i], amount: inputData[sorted[i]] }))
    .filter((i) => i.name);
};

function UserEmojiUsageTable({ data }: InputData) {
  return (
    <Table borderless className="text-light">
      <thead>
        <tr>
          <th scope="col">User</th>
          <th scope="col">Emojis</th>
        </tr>
      </thead>
      <tbody>
        {data.users.map((name, index) => (
          <tr key={name}>
            <th scope="row" className="user-name-table" style={{color: defaultColors[index % defaultColors.length]}}>{name}</th>
            <td>
              {getTopEmojis(data.emojiUsagePerUser[name], 5).map((emoji) => (
                <span
                  className="rounded-pill participant-pill"
                  key={emoji.name}
                >
                  {emoji.name} <small>({emoji.amount})</small>
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserEmojiUsageTable;
