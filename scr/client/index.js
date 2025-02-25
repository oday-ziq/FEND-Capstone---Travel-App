import { getTripData } from "./js/app";
import "./styles/style.scss";

// Add event listener to the form submission
document.getElementById("tripForm").addEventListener("submit", getTripData);

// Register Service Worker for offline support
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(() => {
            console.log("Service Worker registered successfully.");
        }).catch(error => {
            console.log("Service Worker registration failed:", error);
        });
    });
}
