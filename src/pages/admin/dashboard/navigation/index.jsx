import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import MainNavEditor from "@/components/admin/components/navigation-editor/MainNavEditor";
import TopNav from "@/components/admin/components/navigation-editor/TopNav";
export default function HomeSections() {
  return (
    <div>
      <AdminPanelWrapper>
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Navigation Bar"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <MainNavEditor />
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Top Navigation"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <TopNav />
          </div>
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
