import Image from "next/image";
import styles from "./card.module.scss";
import Button from "../button/Button";
import ConditionalRenderer from "../ConditionalRenderer";
import GetCategoryColor from "@/helpers/GetCategoryColor";

function Card(props) {
  return (
    <div className={`${styles.card_wrap} ${props.className}||''`}>
      <div className={styles.card}>
        <div className={styles.card_imageWrap}>
          <div className={styles.card_image}>
            <Image src={props.imgSrc} alt={props.imgAlt} fill />
          </div>
        </div>
        <div className={styles.card_content}>
          <ConditionalRenderer condition={props.lable}>
            <div
              className={`${styles.card_lable} h6 mb-10 c-${GetCategoryColor(
                props.lable
              )}`}
            >
              {props.lable}
            </div>
          </ConditionalRenderer>
          <ConditionalRenderer condition={props.title}>
            <div className={`${styles.card_title} h3 mb-20`}>{props.title}</div>
          </ConditionalRenderer>
          <ConditionalRenderer condition={props.summary}>
            <p className={`${styles.card_summary} w-600`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum
              dolor sit amet, consectetur adipiscing elit
            </p>
          </ConditionalRenderer>
          <ConditionalRenderer condition={props.href}>
            <Button href={props.href}>{props.btnLable || "Read More"}</Button>
          </ConditionalRenderer>
        </div>
      </div>
    </div>
  );
}

export default Card;
