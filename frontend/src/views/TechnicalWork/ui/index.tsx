import s from "./TechnicalWork.module.scss";

export default function TechnicalWorks() {
  return (
    <div className={s.technicalWorks}>
      <h1 className={s.title}>
        Сейчас ведутся технически работы...
        <br />
        Сайт будет доступен в 18:00 Киев/МСК
        <br />
        Подробнее в нашем{" "}
        <a
          className={s.link}
          target="_blank"
          href="https://t.me/StoryCraftTeam"
        >
          телеграмм канале
        </a>{" "} 
        и{" "}
        <a
          className={s.link}
          target="_blank"
          href="https://t.me/+xCg9EgDCJg40YTYy"
        >
          группе{" "}
        </a>
      </h1>
    </div>
  );
}
