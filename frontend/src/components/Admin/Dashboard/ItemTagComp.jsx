import "styles/Admin/Dashboard/TagComp.scss";
export default function ItemTagComp(props) {
   return (
      <div className="tag" 
      style={{ backgroundColor: props.bgColorTag }}>
         <div className="tag__content">
            <div className="tag__content--icon" 
            style={{
               backgroundColor: props.bgColorIcon, 
               color: "white", 
               fontSize: "24px" 
            }}>
               {props.icon}
            </div>
            <div className="tag__content--text" 
            style={{ color: props.bgColorIcon }}>
               <p>{props.title}</p>
               <span>{props.content}</span>
            </div>
         </div>
      </div>
   )
}
