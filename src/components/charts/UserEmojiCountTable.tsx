import * as React from 'react';
import { Table } from 'react-bootstrap';
import { InputData } from './input-interface';
import { defaultColors } from '../../constants/colors';

function UserEmojiCountTable({ data }: InputData) {
  return (
    <Table borderless responsive className="text-light">
      <thead>
        <tr>
          <th scope="col" title="The user">User</th>
          <th scope="col" title="The total amount of emoji's this user uses">#</th>
          <th scope="col" title="The percentage of emoji's a specific user has contributed to the conversation">%</th>
          <th scope="col" title="The average amount of emoji's per message">Average Per Message</th>
        </tr>
      </thead>
      <tbody>
        {data.users.map((name, index) => (
          <tr key={name}>
            <th
              scope="row"
              style={{ color: defaultColors[index % defaultColors.length] }}
            >
              {name}
            </th>
            <td>{data.emojisPerUser[name].length}</td>
            <td>
              {Math.round(
                (data.emojisPerUser[name].length / data.totalEmojis) * 100
              )}
              %
            </td>
            <td>
              {parseFloat(
                `${
                  data.emojisPerUser[name].length /
                  data.messagesPerUser[name].length
                }`
              ).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="fw-bold">
          <td>Total</td>
          <td>{data.totalEmojis}</td>
          <td>100%</td>
          <td>
            {parseFloat(`${data.totalEmojis / data.totalMessages}`).toFixed(1)}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}

export default UserEmojiCountTable;
