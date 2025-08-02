// src/pages/Home.jsx
import HomeHeader from "../components/HomeHeader";
import MessagePreview from "../components/MessagePreview";
import CalendarWidget from "../components/CalendarWidget";
import PersonalTodoList from "../components/PersonalTodoList";
import SharedTodoList from "../components/SharedTodoList";
import TaskStats from "../components/TaskStats";
import MotivationalQuote from "../components/MotivationalQuote";
import WeatherWidget from "../components/WeatherWidget";
import ClockWidget from "../components/ClockWidget";

const Home = () => {
  return (
    <div className="p-6 bg-[#f9fafb] min-h-screen">
      <HomeHeader />

      {/* Grid Layout: Responsive 2-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mt-6">

        {/* Row 4 */}
        <WeatherWidget />
        <ClockWidget />

        {/* Row 1 */}
        <MessagePreview />
        <CalendarWidget />

        {/* Row 2 */}
        <PersonalTodoList />
        <SharedTodoList />

        {/* Row 3 */}
        <TaskStats />
        <MotivationalQuote />


      </div>
    </div>
  );
};

export default Home;
