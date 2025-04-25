import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import './ImageGrid.css'
import { Description, PictureAsPdf, InsertDriveFile } from '@mui/icons-material'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
interface ImageGridProps {
    files: string[]
}

export default function ImageGrid({ files }: ImageGridProps) {
    const [openLightbox, setOpenLightbox] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index)
        setOpenLightbox(true)
    }

    // Tách file tài liệu và ảnh
    const documentFiles = files.filter(file => /\.(pdf|docx?|xlsx?|pptx?)$/i.test(file))
    const imageFiles = files.filter(file => /\.(png|jpe?g|gif|bmp|webp)$/i.test(file))

    // Hiển thị tài liệu
    const renderDocuments = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
            {documentFiles.map((file, index) => {
                const fileName = file.split('/').pop() || file
                const fileExtension = file.split('.').pop()?.toLowerCase()

                console.log('fileExtension:', fileExtension)

                const getIcon = () => {
                    switch (fileExtension) {
                        case 'pdf':
                            return <PictureAsPdf sx={{ color: '#ff2e2e' }} /> // Icon PDF
                        case 'doc':
                        case 'docx':
                            return <Description fontSize='small' sx={{ color: '#2cb5ff' }} /> // Icon Word
                        case 'xls':
                        case 'xlsx':
                            return <Description fontSize='small' sx={{ color: '#46ff46' }} /> // Icon Excel
                        default:
                            return <InsertDriveFile sx={{ color: '#888' }} /> // Icon mặc định cho các file khác
                    }
                }

                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 1,
                            border: '1px solid var(--border-color)',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid var(--button-color)'
                            },
                            cursor: 'pointer'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                            onClick={() => window.open(file, '_blank')}
                        >
                            <Typography variant='body1' sx={{ fontSize: '18px' }}>
                                {getIcon()}
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{
                                    color: 'var(--text-color)'
                                }}
                            >
                                {fileName}
                            </Typography>
                        </Box>
                        <DownloadRoundedIcon sx={{ color: 'var(--text-color)' }} />
                    </Box>
                )
            })}
        </Box>
    )

    const renderImages = () => {
        switch (imageFiles.length) {
            case 1:
                return (
                    <Box
                        sx={{
                            width: '100%',
                            '&:hover': {
                                border: '1px solid var(--button-color)'
                            },
                            height: '400px', // hoặc tùy chỉnh chiều cao
                            position: 'relative'
                        }}
                        onClick={() => handleImageClick(0)}
                    >
                        <img
                            src={imageFiles[0]}
                            alt='Single image'
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                )

            case 2:
                return (
                    <Box sx={{ display: 'grid', gap: 0.5, gridTemplateRows: '1fr 1fr' }}>
                        {imageFiles.map((img, index) => (
                            <Box
                                key={index}
                                sx={{
                                    height: '200px',
                                    position: 'relative',
                                    '&:hover': {
                                        border: '1px solid var(--button-color)'
                                    },
                                    border: '1px solid var(--border-color)'
                                }}
                                onClick={() => handleImageClick(index)}
                            >
                                <img
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                )

            case 3:
                return (
                    <Box sx={{ display: 'grid', gap: 0.5, gridTemplateRows: '1fr auto' }}>
                        <Box
                            sx={{
                                height: '300px',
                                position: 'relative',
                                '&:hover': {
                                    border: '1px solid var(--button-color)'
                                },
                                border: '1px solid var(--border-color)'
                            }}
                            onClick={() => handleImageClick(0)}
                        >
                            <img
                                src={imageFiles[0]}
                                alt='Top image'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    cursor: 'pointer'
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                            {imageFiles.slice(1).map((img, index) => (
                                <Box
                                    key={index + 1}
                                    sx={{
                                        height: '150px',
                                        position: 'relative',
                                        '&:hover': {
                                            border: '1px solid var(--button-color)'
                                        },
                                        border: '1px solid var(--border-color)'
                                    }}
                                    onClick={() => handleImageClick(index + 1)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 2}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )

            case 4:
                return (
                    <Box sx={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 0.5 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                            {imageFiles.slice(0, 2).map((img, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        height: '200px',
                                        position: 'relative',
                                        '&:hover': {
                                            border: '1px solid var(--button-color)'
                                        },
                                        border: '1px solid var(--border-color)'
                                    }}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                            {imageFiles.slice(2).map((img, index) => (
                                <Box
                                    key={index + 2}
                                    sx={{
                                        height: '200px',
                                        position: 'relative',
                                        '&:hover': {
                                            border: '1px solid var(--button-color)'
                                        },
                                        border: '1px solid var(--border-color)'
                                    }}
                                    onClick={() => handleImageClick(index + 2)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 3}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )

            default: // 5 ảnh trở lên
                return (
                    <Box sx={{ display: 'grid', gap: 0.5, gridTemplateRows: 'auto 1fr' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                            {imageFiles.slice(0, 2).map((img, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        height: '200px',
                                        '&:hover': {
                                            border: '1px solid var(--button-color)'
                                        },
                                        position: 'relative',
                                        border: '1px solid var(--border-color)'
                                    }}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0.5 }}>
                            {imageFiles.slice(2, 5).map((img, index) => (
                                <Box
                                    key={index + 2}
                                    sx={{
                                        height: '150px',
                                        '&:hover': {
                                            border: '1px solid var(--button-color)'
                                        },
                                        position: 'relative',
                                        border: '1px solid var(--border-color)'
                                    }}
                                    onClick={() => handleImageClick(index + 2)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 3}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    {index === 2 && imageFiles.length > 5 && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                            }}
                                        >
                                            +{imageFiles.length - 5}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )
        }
    }

    return (
        <Box
            sx={{
                width: 'auto',
                height: 'auto',
                marginTop: 1,
                marginBottom: 1.1
            }}
        >
            {documentFiles.length > 0 && renderDocuments()}
            {imageFiles.length > 0 && renderImages()}

            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                slides={imageFiles.map(src => ({ src }))}
                plugins={[Zoom]}
                zoom={{
                    maxZoomPixelRatio: 5, // Giảm từ 5 xuống 2
                    zoomInMultiplier: 1.5,
                    doubleTapDelay: 300, // Delay cho double tap zoom
                    doubleClickDelay: 300, // Delay cho double click zoom
                    wheelZoomDistanceFactor: 100, // Tốc độ zoom khi dùng chuột (càng nhỏ càng nhanh)
                    pinchZoomDistanceFactor: 100 // Tốc độ zoom khi pinch trên mobile
                }}
                index={selectedImageIndex}
            />
        </Box>
    )
}
