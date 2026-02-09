document.addEventListener("DOMContentLoaded", () => {
  const ids = [
    "blockOn","redirectOn","shortOn",
    "blockTitle","blockUp",
    "redirectTitle","redirectUp"
  ];

  chrome.storage.sync.get(null, data=>{
    ids.forEach(id=>{
      const el=document.getElementById(id);
      if(el.type==="checkbox") el.checked=data[id];
      else el.value=(data[id]||[]).join(",");
    });
  });

  document.getElementById("save").onclick=()=>{
    const obj={};
    ids.forEach(id=>{
      const el=document.getElementById(id);
      obj[id]= el.type==="checkbox"
        ? el.checked
        : el.value.split(/[\n,，、\s]+/).map(s=>s.trim()).filter(Boolean);
    });
    chrome.storage.sync.set(obj);
  };
});
