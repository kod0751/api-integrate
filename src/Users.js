import React, { useState } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import User from "./User";

async function getUsers() {
	const response = await axios.get(
		"http://jsonplaceholder.typicode.com/users/",
	);
	return response.data;
}

function UsersReducer() {
	const [userId, setUserId] = useState(null);
	const { data: users, error, isLoading, reload, run } = useAsync({
		deferFn: getUsers, //promisFn - 바로 불러올 떄 , deferFn - 특정 버튼을 눌러 불러오고 싶을 떄(run)
	});

	if (isLoading) return <div>로딩중...</div>;
	if (error) return <div>에러가 발생했습니다.</div>;
	if (!users) return <button onClick={run}>불러오기</button>;

	return (
		<>
			<ul>
				{users.map(user => (
					<li key={user.id} onClick={() => setUserId(user.id)}>
						{user.username}({user.name})
					</li>
				))}
			</ul>
			<button onClick={reload}>다시 불러오기</button>
			{userId && <User id={userId} />}
		</>
	);
}

export default UsersReducer;
