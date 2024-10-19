import File from "../../assets/StudentPortalAssets/File.png"
import File2 from "../../assets/StudentPortalAssets/File2.png"
import File3 from "../../assets/StudentPortalAssets/File3.png"
import File4 from "../../assets/StudentPortalAssets/File4.png"
import File5 from "../../assets/StudentPortalAssets/File5.png"
import File6 from "../../assets/StudentPortalAssets/File6.png"
import WidgetBackground from "../../Components/StudentPortalComp/WidgetBackground";


const Testing = () => {
    return (
        <div>
            <div style={{ width: '1000px', height: '300px' }}>
                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px' }} >
                        <img src={File} style={{ height: '100px', width: '100px' }} />
                        <h1 className="testing-word-two">No achviement has been found</h1>
                        <p className="testing-word-two">This content will appear on top of the mesh gradient background.</p>
                    </div>
                </WidgetBackground>
            </div>
            <div style={{ width: '1000px', height: '300px' }}>
                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px' }} >
                        <img src={File2} style={{ height: '100px', width: '100px' }} />
                        <h1 className="testing-word-two">No achviement has been found</h1>
                        <p className="testing-word-two">This content will appear on top of the mesh gradient background.</p>
                    </div>
                </WidgetBackground>
            </div>
            <div style={{ width: '1000px', height: '300px' }}>
                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px' }} >
                        <img src={File3} style={{ height: '100px', width: '100px' }} />
                        <h1 className="testing-word-two">No achviement has been found</h1>
                        <p className="testing-word-two">This content will appear on top of the mesh gradient background.</p>
                    </div>
                </WidgetBackground>
            </div>
            <div style={{ width: '1000px', height: '300px' }}>
                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px' }} >
                        <img src={File4} style={{ height: '100px', width: '100px' }} />
                        <h1 className="testing-word-two">No achviement has been found</h1>
                        <p className="testing-word-two">This content will appear on top of the mesh gradient background.</p>
                    </div>
                </WidgetBackground>
            </div>
            <div style={{ width: '1000px', height: '300px' }}>
                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px' }} >
                        <img src={File5} style={{ height: '100px', width: '100px' }} />
                        <h1 className="testing-word-two">No achviement has been found</h1>
                        <p className="testing-word-two">This content will appear on top of the mesh gradient background.</p>
                    </div>
                </WidgetBackground>
            </div>
            <div style={{ width: '700px', height: '225px' }} className="mx-5 my-5">
                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px' }} className="d-flex justify-content-center" >
                        <img src={File5} className="ms-5 me-4" style={{ height: '100px', width: '100px' }} />
                        <div className="d-flex flex-column justify-content-center ">
                            <h1 className="testing-word-two">No achviement has been found</h1>
                            <p className="testing-word-two">This content will appear on top of the mesh gradient background.</p>
                        </div>
                    </div>
                </WidgetBackground>
            </div>
            <div style={{ width: '1000px', height: '300px' }}>
                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px' }} >
                        <img src={File6} style={{ height: '100px', width: '100px' }} />
                        <h1 className="testing-word-two">No achviement has been found</h1>
                        <p className="testing-word-two">This content will appear on top of the mesh gradient background.</p>
                    </div>
                </WidgetBackground>
            </div>
            <div style={{ width: '1000px', height: '200px' }}>
                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px' }} >
                        <h1 className="testing-word-three">No achviement has been found</h1>
                        <p className="testing-word-three">This content will appear on top of the mesh gradient background.</p>
                    </div>
                </WidgetBackground>
            </div>
            <div style={{ width: '700px', height: '200px' }}>

                <WidgetBackground className="m-3 ">

                    <div style={{ padding: '20px', color: 'white' }} >
                        <h1 className="text-black">No achviement has been found</h1>
                        <p className="text-black">This content will appear on top of the mesh gradient background.</p>
                    </div>
                </WidgetBackground>
            </div>
        </div>
    );
};

export default Testing;