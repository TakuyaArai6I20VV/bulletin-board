const threadSectionDOM = document.querySelector(".thread-section");
const inputTitleDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const formDOM = document.querySelector(".form-section");

let inputTitle = "";
let inputContentText = "";

const getAllThreads = async () => {
  try {
    let allThreads = await axios.get("/api/v1/threads");
    console.log(allThreads);
    let { data } = allThreads;
    console.log(data);

    allThreads = data.map((thread) => {
      const { title, content } = thread;
      console.log(title, content);

      return `
        <div class="single-thread">
          <h3>${title}</h3>
          <p>${content}</p>
        </div>
      `;
    }).join("");
    threadSectionDOM.innerHTML = allThreads;
  } catch(err) {
    console.log(err);
  }
};

getAllThreads();

inputTitleDOM.addEventListener("change", (e) => {
  inputTitle = e.target.value;
  console.log(inputTitle);
});

inputContentDOM.addEventListener("change", (e) => {
  inputContentText = e.target.value;
  console.log(inputContentText);
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  if(inputTitle && inputContentText) {
    console.log("add data");
    try{
      await axios.post("/api/v1/thread", {
        title: inputTitle,
        content: inputContentText,
      });
      getAllThreads();
    } catch (err) {
      console.log(err);
    }
  }
});
