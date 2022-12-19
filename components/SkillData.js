import {
    DockerLogo,
    JavaLogo,
    KafkaLogo,
    LinuxLogo,
    MybatisLogo,
    MysqlLogo,
    PgsqlLogo, ReactLogo,
    RedisLogo,
    RocketmqLogo,
    SpringLogo, VueSVG,
    EthereumLogo
} from "./logo/SkillLogo";

export const skills = [
    {
        name: "Java",
        link: "https://www.java.com/",
        svg: <JavaLogo/>
    },
    {
        name: "SpringBoot",
        link: "https://spring.io/",
        svg: <SpringLogo/>
    },
    {
        name: "MyBatis",
        link: "https://mybatis.org/mybatis-3/",
        svg:  <MybatisLogo/>
    },
    {
        name: "MySQL",
        link: "https://www.mysql.com/",
        svg: <MysqlLogo/>
    },
    {
        name: "PostgreSQL",
        link: "https://www.postgresql.org/",
        svg: <PgsqlLogo/>
    },
    {
        name: "Redis",
        link: "https://redis.io/",
        svg: <RedisLogo/>
    },
    {
        name: "RocketMQ",
        link: "https://rocketmq.apache.org/",
        svg: <RocketmqLogo/>
    },
    {
        name: "Kafka",
        link: "https://kafka.apache.org/",
        svg: <KafkaLogo/>
    },
    {
        name: "Linux",
        link: "https://www.linux.org/",
        svg: <LinuxLogo/>
    }, {
        name: "Docker",
        link: "https://www.docker.com/",
        svg: <DockerLogo/>
    },
    {
        name: "React",
        link: "https://reactjs.org/",
        svg: <ReactLogo/>
    },
    {
        name: "Vue",
        link: "https://cn.vuejs.org/",
        svg: <VueSVG/>
    },
    {
        name: "Ethereum(Solidity)",
        link: "https://ethereum.org/en/",
        svg: <EthereumLogo/>
    }
]