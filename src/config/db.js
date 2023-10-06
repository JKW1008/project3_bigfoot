import mysql from "mysql2";

/**
 * 데이터베이스 설정 정보
 * process.env는 .env 파일에 설정한 환경변수를 불러온다. -> dotenv 패키지 사용 중 (package.json 확인)
 * git에는 .env 파일을 공유하면 안된다 -> why? db 아이디, 비밀번호 등 보안에 취약한 정보가 담겨있기 때문
 */
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
};

/**
 * 데이터베이스와 연결한 커넥션들을 Pool에 담아둔다.
 * 데이터베이스와 연결하려면 커넥션이 필요한데 요청할 때마다 커넥션을 생성하고 끝날때마다 종료하는 것은 자원을 많이 사용하며, 높은 트래픽 상황에서는 시스템에 부담을 줄 수 있다.
 * Pool은 커넥션을 미리 만들어두고, 연결이 필요할 때마다 만들어진 커넥션을 사용한다.
 */
const db = mysql.createPool(config).promise();

export default db;
